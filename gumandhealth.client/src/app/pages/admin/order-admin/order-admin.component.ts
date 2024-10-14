import { Component, OnInit } from '@angular/core';
import { NajlaaService } from '../../../services/najlaa.service';  // خدمة البيانات
import { Router } from '@angular/router';
import jsPDF from 'jspdf';  // استيراد jsPDF لتوليد ملفات PDF
import Swal from 'sweetalert2';  // SweetAlert للتنبيهات

@Component({
  selector: 'app-order-admin',
  templateUrl: './order-admin.component.html',
  styleUrls: ['./order-admin.component.css']
})
export class OrderAdminComponent implements OnInit {
  orders: any[] = [];  // متغير لتخزين الطلبات

  // متغيرات البحث
  userName: string = '';
  orderDate: string = '';
  productName: string = '';

  constructor(private najlaaService: NajlaaService, private router: Router) { }

  ngOnInit(): void {
    this.getOrders();  // استدعاء دالة جلب الطلبات عند التهيئة
    this.searchOrders();  // البحث عند تحميل الصفحة بدون أي معيار
  }

  // دالة البحث عن الطلبات بناءً على المعايير
  searchOrders(): void {
    this.najlaaService.searchOrders(this.userName, this.orderDate, this.productName).subscribe(
      data => {
        this.orders = data;  // تخزين النتائج في المتغير
      },
      error => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  // دالة لجلب الطلبات من الخدمة
  getOrders(): void {
    this.najlaaService.getAllOrders().subscribe(
      (data: any[]) => {
        this.orders = data;
      },
      (error: any) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  // دالة لإنشاء PDF من الطلبات بدون جدول
  generatePDF(): void {
    const doc = new jsPDF();  // إنشاء مستند PDF جديد

    // إضافة عنوان التقرير
    doc.text('Orders Report', 14, 10);

    let yPosition = 20;  // تحديد مكان البداية على محور Y

    // إضافة بيانات الطلبات بشكل نصوص فقط
    this.orders.forEach(order => {
      doc.text(`Order ID: ${order.id}`, 14, yPosition);
      doc.text(`User Name: ${order.userName}`, 14, yPosition + 10);
      doc.text(`Order Date: ${order.orderDate}`, 14, yPosition + 20);
      doc.text(`Total Amount: $${order.totalAmount}`, 14, yPosition + 30);
      doc.text(`Status: ${order.status}`, 14, yPosition + 40);

      // عرض تفاصيل العناصر المطلوبة
      let orderItems = order.orderItems.map((item: any) => `${item.productName} (x${item.quantity}) - $${item.price}`).join(', ');
      doc.text(`Items: ${orderItems}`, 14, yPosition + 50);

      yPosition += 70;  // الانتقال إلى السطر التالي
    });

    // حفظ ملف PDF
    doc.save('orders-report.pdf');

    // إظهار رسالة نجاح باستخدام SweetAlert
    Swal.fire({
      icon: 'success',
      title: 'PDF Generated!',
      text: 'The orders report has been successfully generated.',
    });
  }
}
