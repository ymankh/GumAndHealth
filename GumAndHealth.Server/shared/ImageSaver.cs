using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GumAndHealth.Server.shared
{
    public static class ImageSaver
    {
     public static string SaveImage(IFormFile? imageFile)
        {
            // Check if the image file is not null and has content
            if (imageFile == null || imageFile.Length == 0)
                throw new ArgumentException("Invalid image file");

            // Create a unique filename to avoid overwriting
            var fileName = Guid.NewGuid() + Path.GetExtension(imageFile.FileName);

            // Define the folder path where the image will be saved
            var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "images");

            // Ensure the directory exists
            if (!Directory.Exists(folderPath))
            {
                Directory.CreateDirectory(folderPath);
            }

            // Combine the folder path and file name to get the full file path
            var filePath = Path.Combine(folderPath, fileName);

            // Save the image to the folder
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                imageFile.CopyTo(stream);
            }

            // Return the relative path to the image
            var relativePath = Path.Combine("images", fileName);
            return relativePath.Replace("\\", "/");
        }   
    }
}
