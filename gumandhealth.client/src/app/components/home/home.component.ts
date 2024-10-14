import { Component, OnInit } from '@angular/core';
import { NajlaaService } from '../../services/najlaa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'], // تم تصحيح اسم الخاصية styleUrl إلى styleUrls
})
export class HomeComponent implements OnInit {

  gyms: any[] = [];
  products: any;
  searchQuery: string = '';
  searchResults: any = null;

  constructor(private najlaaService: NajlaaService) { }

  performSearch() {
    if (this.searchQuery.trim()) {
      this.najlaaService.search(this.searchQuery).subscribe(results => {
        this.searchResults = results;
        console.log("searchResults",this.searchResults);  // تحقق من ظهور النتائج في Console
        this.showResults();  // عرض النتائج باستخدام SweetAlert
      }, error => {
        console.error('Error fetching search results:', error);
      });
    } else {
      Swal.fire('Please enter a search query', '', 'warning');
    }
  }
  showResults() {
    if (this.searchResults) {
      let htmlContent = '';

      // فحص البيانات وإضافة العناوين فقط في حال وجود بيانات
      if (this.searchResults.classServices && this.searchResults.classServices.length > 0) {
        htmlContent += `<h5>Class Services</h5><ul>`;
        this.searchResults.classServices.forEach((service: any) => {
          htmlContent += `<li><strong>${service.name}</strong>: ${service.pricePerMonth}</li>`;
        });
        htmlContent += `</ul>`;
      }

      if (this.searchResults.gymServices && this.searchResults.gymServices.length > 0) {
        htmlContent += `<h5>Gym Services</h5><ul>`;
        this.searchResults.gymServices.forEach((service: any) => {
          htmlContent += `<li><strong>${service.name}</strong>: ${service.description}<strong>${service.pricePerMonth}</strong></li>`;
        });
        htmlContent += `</ul>`;
      }

      if (this.products && this.searchResults.products.length > 0) {
        htmlContent += `<h5>Products</h5><ul>`;
        this.searchResults.products.forEach((product: any) => {
          htmlContent += `<li><strong>${product.name}</strong>: ${product.price} JD</li>`;
        });
        htmlContent += `</ul>`;
      }

      if (this.searchResults.recipes && this.searchResults.recipes.length > 0) {
        htmlContent += `<h5>Recipes</h5><ul>`;
        this.searchResults.recipes.forEach((recipe: any) => {
          htmlContent += `<li><strong>${recipe.name}</strong>: ${recipe.description}</li>`;
        });
        htmlContent += `</ul>`;
      }

      // إذا لم تكن هناك نتائج لعرضها
      if (!htmlContent) {
        htmlContent = '<p>No results found.</p>';
      }

      // عرض النتائج باستخدام SweetAlert
      Swal.fire({
        title: 'Search Results',
        html: htmlContent,
        icon: 'info',
        showCloseButton: true,
        focusConfirm: false,
        confirmButtonText: 'Close'
      });
    }
  }


  // تحميل البيانات عند بدء تشغيل المكون
  ngOnInit() {
    this.najlaaService.getProducts().subscribe((data: any) => {
      this.products = data; // الحصول على بيانات المنتجات
    });
    this.najlaaService.getGyms().subscribe((data: any[]) => {
      this.gyms = data; // الحصول على بيانات الصالات
    });
  }


  testimonials = [
    {
      name: 'John Doe',
      role: 'Fitness Enthusiast',
      image: 'instructor7.png',
      message: 'This gym has changed my life! The trainers are amazing and the equipment is top-notch.'
    },
    {
      name: 'Jane Smith',
      role: 'Yoga Instructor',
      image: 'instructor6.png',
      message: 'I love the yoga classes here! The ambiance is perfect, and the community is so supportive.'
    },
    {
      name: 'Alex Brown',
      role: 'Bodybuilder',
      image: 'instructor5.png',
      message: 'If you are serious about fitness, this is the place to be. Great machines and a motivating environment.'
    },
    {
      name: 'Emily Clark',
      role: 'Personal Trainer',
      image: 'instructor4.png',
      message: 'Being a trainer here has allowed me to help others reach their fitness goals. It’s the best gym I’ve worked in.'
    },
    {
      name: 'Michael Johnson',
      role: 'CrossFit Athlete',
      image: 'instructor3.png',
      message: 'The CrossFit programs here are outstanding! I’ve seen huge improvements in my strength and endurance.'
    },
    {
      name: 'Sarah Williams',
      role: 'Pilates Instructor',
      image: 'instructor2.png',
      message: 'Pilates classes here are top-notch. The equipment is well-maintained, and the instructors are fantastic!'
    },
    {
      name: 'James Lee',
      role: 'Martial Arts Expert',
      image: 'instructor1.png',
      message: 'The martial arts section is well-equipped, and the coaches are experienced professionals.'
    },
    {
      name: 'Anna Garcia',
      role: 'Nutritionist',
      image: 'download3.jfif',
      message: 'As a nutritionist, I appreciate how the gym encourages healthy eating habits along with fitness training.'
    },
    {
      name: 'David Martinez',
      role: 'Strength Trainer',
      image: 'download2.jfif',
      message: 'The strength training facilities here are excellent. The atmosphere pushes you to do your best every day.'
    },
    {
      name: 'Laura Turner',
      role: 'Cardio Enthusiast',
      image: 'download1.jfif',
      message: 'I enjoy the wide range of cardio equipment available. It’s easy to stay motivated and track my progress.'
    }
  ];
  }
