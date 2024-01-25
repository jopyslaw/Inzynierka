import { FormArray, FormControl } from '@angular/forms';

export interface MessageModel {
  title: FormControl<string | null>;
  reciverId: FormControl<string | null>;
  content: FormControl<string | null>;
}
