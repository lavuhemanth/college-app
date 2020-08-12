import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private spinnerStatus = new BehaviorSubject<any>({enableSpinner: false});
  currentStatus = this.spinnerStatus.asObservable();

  constructor() { }

  /**
   * Common method across application to enable/ disable spinner
   *
   * @param enableSpinner pass `true` to enable spinner, `false` otherwise
   * @param blocking `true` if spinner is blocking, `false` for non-blocking spinner.
   */
  changeStatus(enableSpinner: boolean = false, blocking: boolean = true) {
    // Make sure there is difference between spinner enable and disable
    // If there is very less difference the WebContainer throws exception
    setTimeout(() => {
      this.spinnerStatus.next( {
        enableSpinner: enableSpinner,
        blocking: blocking
      });
    }, 100);
  }
}
