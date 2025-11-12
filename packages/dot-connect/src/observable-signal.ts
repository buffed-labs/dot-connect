import { Signal } from "@lit-labs/signals";
import type { ReactiveController, ReactiveControllerHost } from "lit";
import type { Observable, Subscription } from "rxjs";

export class ObservableSignal<TValue>
  extends Signal.State<TValue>
  implements ReactiveController
{
  #observable: Observable<TValue> | (() => Observable<TValue>);

  #subscription: Subscription | undefined;

  constructor(
    host: ReactiveControllerHost,
    observable: Observable<TValue> | (() => Observable<TValue>),
    initialValue?: TValue,
  ) {
    super(initialValue as TValue);
    this.#observable = observable;
    this.set(initialValue as TValue);
    host.addController(this);
  }

  hostConnected(): void {
    this.#subscription ??= (
      typeof this.#observable === "function"
        ? this.#observable()
        : this.#observable
    ).subscribe({
      next: (value) => this.set(value),
    });
  }

  hostDisconnected(): void {
    this.#subscription?.unsubscribe();
    this.#subscription = undefined;
  }
}

export const observableSignal = <TValue>(
  host: ReactiveControllerHost,
  observable: Observable<TValue> | (() => Observable<TValue>),
  initialValue?: TValue,
) => new ObservableSignal(host, observable, initialValue);
