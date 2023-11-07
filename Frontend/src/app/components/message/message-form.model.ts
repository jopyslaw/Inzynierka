import { FormArray, FormControl } from '@angular/forms';

export interface NextMessageModel {
  reciverId: FormControl<any>;
  senderId: FormControl<any>;
  content: FormControl<any>;
}
