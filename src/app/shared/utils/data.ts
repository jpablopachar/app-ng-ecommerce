import { DocumentChange } from '@angular/fire/firestore';

interface Item {
  id?: string;
  [key: string]: any;
}

export const extractDocumentChangeData: (
  x: DocumentChange<any>,
  addId?: boolean
) => Item | any = (
  x: DocumentChange<any>,
  addId: boolean | undefined = true
): Item | any => {
  const data: any = x.doc.data();

  if (addId) {
    data.id = x.doc.id;
  }

  return data;
};
