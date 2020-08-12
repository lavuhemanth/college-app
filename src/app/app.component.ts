import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
} from "@angular/router";
import { SpinnerService } from "./spinner.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit, OnDestroy {
  isSpinnerActive = false;
  isBlockingSpinner = false;
  spinnerSub: Subscription;

  constructor(private spinner: SpinnerService, private router: Router) {
    this.isSpinnerActive = true;
    this.isBlockingSpinner = false;
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
  }

  ngOnInit() {
    this.spinnerSub = this.spinner.currentStatus.subscribe((data) => {
      this.isSpinnerActive = data.enableSpinner; // Current spinner status
      this.isBlockingSpinner = data.blocking; // Whether spinner blocks UI
    });
  }

  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.spinner.changeStatus(true, true);
    }
    if (event instanceof NavigationEnd) {
      this.spinner.changeStatus(false, false);
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.spinner.changeStatus(false, false);
    }
    if (event instanceof NavigationError) {
      this.spinner.changeStatus(false, false);
    }
  }

  ngOnDestroy(): void {
    this.spinnerSub.unsubscribe();
  }
}
