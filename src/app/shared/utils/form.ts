import { ControlItem } from 'src/app/models';

export const markFormGroupTouched: (formGroup: any) => void = (
  formGroup: any
): void => {
  (Object as any).values(formGroup.controls).forEach((control: any): void => {
    control.markAsTouched();

    if (control.controls) {
      markFormGroupTouched(control);
    }
  });
};

export interface Control {
  items?: ControlItem[];
  changed?: () => void;
  map?: (() => void) | any;
}

export interface ControlEntities {
  [key: string]: Control;
}

export const mapControls: (controls: ControlEntities) => void = (
  controls: ControlEntities
): void => {
  Object.keys(controls).forEach((key: string): void => {
    if (controls[key].map) {
      controls[key].map();
    }
  });
};
