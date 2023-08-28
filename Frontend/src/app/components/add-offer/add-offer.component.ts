import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FoodService } from 'src/app/services/food-service/food.service';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.scss'],
})
export class AddOfferComponent implements OnInit {
  addForm!: FormGroup;
  foodCategories: any[] = [
    'Napoje',
    'Przekąski',
    'Dania główne',
    'Desery',
    'Przystawki',
  ];

  constructor(private addService: FoodService) {}

  ngOnInit(): void {
    this.addForm = new FormGroup({
      foodName: new FormControl(null),
      category: new FormControl(null),
      description: new FormControl(null),
      price: new FormControl(null),
      image: new FormControl(null),
    });
  }

  sendForm(): void {
    const data = this.addForm.value;
    const img = this.addForm.get('image')?.value;
    delete data.image;
    delete data.category;
    this.addService.addFood(data).subscribe((data) => {
      console.log('data was send');
    });

    this.addService.addFoodImg(img).subscribe(() => {});
  }

  clearFrom(): void {
    this.addForm.reset();
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.addForm.get('image')?.setValue(file);
    }
  }
}
