using GumAndHealth.Server.DTOs.GymServiceDTOs;
using GumAndHealth.Server.Models;
using GumAndHealth.Server.shared;

namespace GumAndHealth.Server.Repositories
{
    public class GymServiceRepository(MyDbContext context)
    {
        public List<GymService> GetAll()
        {
            return context.GymServices.ToList();
        }

        public GymService Create(GymServiceCreateDto newGem)
        {
            var gemService = new GymService
            {
                Name = newGem.Name,
                Description = newGem.Description,
            };

            if (newGem.Image != null)
            {
                gemService.ImagePath = ImageSaver.SaveImage(newGem.Image);
            }

            return gemService;

        }
    }
}
