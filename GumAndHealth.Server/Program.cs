using System.Text;
using GumAndHealth.Server.Helpers;
using GumAndHealth.Server.Models;
using GumAndHealth.Server.Repositories;
using GumAndHealth.Server.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using NuGet.Protocol.Core.Types;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace GumAndHealth.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            // Add services to the container.
            builder.Services.AddDbContext<MyDbContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("YourConnectionString")));


            // Adding the repos
            builder.Services.AddSingleton<GenerateJwtToken>();
            builder.Services.AddScoped<AuthRepository>();
            builder.Services.AddScoped<GymServiceRepository>();
            builder.Services.AddScoped<CartRepository>();
            builder.Services.AddScoped<PayPalPaymentService>();
            builder.Services.AddScoped<ProductsRepository>();
            builder.Services.AddScoped<CategoryRepository>();

            //Add JWT Bearer Authentication
            builder.Services.AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(options =>
                {
                    options.RequireHttpsMetadata = false; // Set to true for production if using HTTPS
                    options.SaveToken = true;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = builder.Configuration["Jwt:Issuer"],
                        ValidAudience = builder.Configuration["Jwt:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
                    };
                });
            builder.Services.AddAuthorization();


            // CORS configuration to allow any origin, method, and header
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAnyOrigin",
                    corsPolicyBuilder =>
                    {
                        corsPolicyBuilder.AllowAnyOrigin()
                            .AllowAnyMethod()
                            .AllowAnyHeader();
                    });
            });
            // Add services to the container.
            builder.Services.AddControllers().AddNewtonsoftJson(options =>
            {
                // Handle circular references
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            });

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(c =>
            {
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Description = "JWT Authorization header using the Bearer scheme. Example: \"Bearer {token}\""
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        Array.Empty<string>()
                    }
                });

                // This adds "Bearer" automatically when the token is entered in Swagger
                c.OperationFilter<AppendBearerTokenOperationFilter>();
            });


            ////hosam************************************
            //// Register TokenGenerator as a singleton or transient service
            //builder.Services.AddSingleton<TokenGenerator>(); // or .AddTransient<TokenGenerator>()

            //// Retrieve JWT settings from configuration
            //var jwtSettings = builder.Configuration.GetSection("Jwt");
            //var key = jwtSettings.GetValue<string>("Key");
            //var issuer = jwtSettings.GetValue<string>("Issuer");
            //var audience = jwtSettings.GetValue<string>("Audience");

            //// Ensure values are not null
            //if (string.IsNullOrEmpty(key) || string.IsNullOrEmpty(issuer) || string.IsNullOrEmpty(audience))
            //{
            //    throw new InvalidOperationException("JWT settings are not properly configured.");
            //}

            //// Add JWT Authentication
            //builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            //    .AddJwtBearer(options =>
            //    {
            //        options.TokenValidationParameters = new TokenValidationParameters
            //        {
            //            ValidateIssuer = true,
            //            ValidateAudience = true,
            //            ValidateLifetime = true,
            //            ValidateIssuerSigningKey = true,
            //            ValidIssuer = jwtSettings["Issuer"],
            //            ValidAudience = jwtSettings["Audience"],
            //            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"]))
            //        };
            //    });

            //builder.Services.AddAuthorization(options =>
            //{
            //    options.AddPolicy("Admin", policy => policy.RequireRole("Admin"));
            //});

            // Add session services
            builder.Services.AddDistributedMemoryCache(); // Adds a default in-memory implementation of IDistributedCache
            builder.Services.AddSession(options =>
            {
                options.IdleTimeout = TimeSpan.FromMinutes(30); // Set session timeout
                options.Cookie.HttpOnly = true; // Make the session cookie HTTP only
                options.Cookie.IsEssential = true; // Make the session cookie essential
            });

            // Add EmailService as a dependency
            builder.Services.AddTransient<EmailService>();

            // Load configuration settings (like SMTP details)
            builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

            builder.Services.AddSingleton<OtpService>();

            builder.Services.AddMemoryCache();

            ////Endhosam***************************************


            var app = builder.Build();

            app.UseDefaultFiles();

            app.UseStaticFiles(); // Serve wwwroot

            // Create the image folder if not existed
            var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "images");
            if (!Directory.Exists(folderPath))
                Directory.CreateDirectory(folderPath);

            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(
                    Path.Combine(builder.Environment.ContentRootPath, "images")),
                RequestPath = "/images"
            });

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            // Enable CORS globally
            app.UseCors("AllowAnyOrigin");

            // Use Authentication and Authorization middleware
            app.UseAuthentication();
            app.UseAuthorization();



            app.MapControllers();

            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
    public class AppendBearerTokenOperationFilter : IOperationFilter
    {
        public void Apply(OpenApiOperation operation, OperationFilterContext context)
        {
            var authHeaderParameter = operation.Parameters?.FirstOrDefault(p => p.Name == "Authorization");
            if (authHeaderParameter != null)
            {
                authHeaderParameter.Description = "Enter your JWT token. Bearer will be added automatically.";
            }
        }
    }
}
