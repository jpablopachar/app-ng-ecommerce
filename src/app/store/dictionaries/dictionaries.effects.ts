import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentChangeAction
} from '@angular/fire/compat/firestore';
import { ControlItem, Item } from '@app/models/client';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as jsonCountries from '@src/assets/countries.json';
import { catchError, map, Observable, of, switchMap, take, zip } from 'rxjs';
import * as fromActions from './dictionaries.actions';
import { Dictionaries, Dictionary } from './dictionaries.models';

type Action = fromActions.All;

const documentToItem: (document: DocumentChangeAction<any>) => Item = (
  document: DocumentChangeAction<any>
): Item => {
  const data: any = document.payload.doc.data();

  return {
    id: document.payload.doc.id,
    ...data,
  };
};

const itemToControlItem: (item: Item) => ControlItem = (
  item: Item
): ControlItem => ({
  value: item.id,
  label: item.name,
  icon: item.icon,
});

const addDictionary: (items: Item[]) => Dictionary = (
  items: Item[]
): Dictionary => ({
  items,
  controlItems: [...items].map(
    (item: Item): ControlItem => itemToControlItem(item)
  ),
});

@Injectable()
export class DictionariesEffects {
  constructor(
    private readonly _actions: Actions,
    private readonly _afs: AngularFirestore
  ) {}

  public read: Observable<Action> = createEffect(
    (): Observable<fromActions.ReadSuccess | fromActions.ReadError> =>
      this._actions.pipe(
        ofType(fromActions.Types.READ),
        switchMap(
          (): Observable<fromActions.ReadSuccess | fromActions.ReadError> => {
            return zip(
              this._afs
                .collection('roles')
                .snapshotChanges()
                .pipe(
                  take(1),
                  map((items: DocumentChangeAction<any>[]): Item[] =>
                    items.map(
                      (item: DocumentChangeAction<any>): Item =>
                        documentToItem(item)
                    )
                  )
                ),
              this._afs
                .collection('specializations')
                .snapshotChanges()
                .pipe(
                  take(1),
                  map((items: DocumentChangeAction<any>[]): Item[] =>
                    items.map(
                      (item: DocumentChangeAction<any>): Item =>
                        documentToItem(item)
                    )
                  )
                ),
              this._afs
                .collection('qualifications')
                .snapshotChanges()
                .pipe(
                  take(1),
                  map((items: DocumentChangeAction<any>[]): Item[] =>
                    items.map(
                      (item: DocumentChangeAction<any>): Item =>
                        documentToItem(item)
                    )
                  )
                ),
              this._afs
                .collection('skills')
                .snapshotChanges()
                .pipe(
                  take(1),
                  map((items: DocumentChangeAction<any>[]): Item[] =>
                    items.map(
                      (item: DocumentChangeAction<any>): Item =>
                        documentToItem(item)
                    )
                  )
                ),
              of(
                (jsonCountries as any).default.map((country: any) => ({
                  id: country.code.toUpperCase(),
                  name: country.name,
                  icon: {
                    src: null,
                    cssClass: 'flag flag-' + country.code.toUpperCase(),
                  },
                }))
              )
            ).pipe(
              map(
                ([
                  roles,
                  specializations,
                  qualifications,
                  skills,
                  countries,
                ]): fromActions.ReadSuccess => {
                  const dictionaries: Dictionaries = {
                    roles: addDictionary(roles),
                    specializations: addDictionary(specializations),
                    qualifications: addDictionary(qualifications),
                    skills: addDictionary(skills),
                    countries: addDictionary(countries),
                  };

                  return new fromActions.ReadSuccess(dictionaries);
                }
              ),
              catchError(
                (error: HttpErrorResponse): Observable<fromActions.ReadError> =>
                  of(new fromActions.ReadError(error.message))
              )
            );
          }
        )
      )
  );
}
