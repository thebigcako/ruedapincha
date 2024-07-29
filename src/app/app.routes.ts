import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, Routes} from '@angular/router';
import {ApiKeyRequesterComponent} from "./api-key-requester/api-key-requester.component";
import {SearchComponent} from "./search/search.component";
import {inject} from "@angular/core";
import {SearchService} from "./shared/search.service";

const canActivateSearch: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const apiKeyStored = inject(SearchService).apiKeyStored();

  if (!apiKeyStored)
  {
    inject(Router).navigate(['add-api-key']);
  }

  return apiKeyStored;
};

export const routes: Routes = [
  { path: 'add-api-key', component: ApiKeyRequesterComponent},
  { path: '', component: SearchComponent, pathMatch: "full", canActivate:  [canActivateSearch]}
];
