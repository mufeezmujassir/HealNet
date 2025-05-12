const imageToBase64 = async (file) => {
  // Maximum width and height for the compressed image
  const MAX_WIDTH = 800;
  const MAX_HEIGHT = 800;
  const MAX_FILE_SIZE_KB = 500; // Maximum file size in KB

  // Return a promise that resolves with the base64 string
  return new Promise((resolve, reject) => {
    // Check file size first
    const fileSizeKB = file.size / 1024;
    console.log(`Original file size: ${fileSizeKB.toFixed(2)} KB`);
    
    // If file is already small enough, just convert to base64
    if (fileSizeKB <= MAX_FILE_SIZE_KB) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      return;
    }
    
    // Need to resize the image
    const img = new Image();
    const reader = new FileReader();
    
    // Set up the file reader to load the image
    reader.onload = function(e) {
      img.src = e.target.result;
      
      // Once image is loaded, resize it
      img.onload = function() {
        // Calculate the new dimensions
        let width = img.width;
        let height = img.height;
        
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        
        // Create a canvas and draw the resized image
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert canvas to base64 with reduced quality
        const base64 = canvas.toDataURL('image/jpeg', 0.7); // Adjust quality (0.7 = 70%)
        
        // Log the new size (approximately)
        const approxSizeKB = base64.length / 1.37 / 1024;
        console.log(`Compressed file size: ~${approxSizeKB.toFixed(2)} KB`);
        
        resolve(base64);
      };
    };
    
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
};

export default imageToBase64;