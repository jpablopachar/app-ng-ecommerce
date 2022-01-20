import { ControlItem, Item } from "@app/models/client";

export interface Dictionaries {
  roles: Dictionary;
  specializations: Dictionary;
  qualifications: Dictionary;
  skills: Dictionary;
  countries: Dictionary;
}

export interface Dictionary {
  items: Item[];
  controlItems: ControlItem[];
}