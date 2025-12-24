import type { EmitFn, HTMLAttributes, PublicProps } from "vue";

type LoosePartial<T> = { [P in keyof T]?: T[P] | undefined };

type ElementProps<T> = Partial<Omit<T, keyof HTMLElement>>;

type VueElementProps<T> = HTMLAttributes &
  LoosePartial<Pick<T, keyof ElementProps<T>>> &
  PublicProps;

export type DefineCustomElement<
  ElementType extends HTMLElement,
  Events extends EventMap = Record<string, never>,
> = new () => ElementType & {
  /**
   * @deprecated Do not use the $props property on a Custom Element ref, this is for template prop types only.
   */
  $props: VueElementProps<ElementType>;

  /**
   * @deprecated Do not use the $emit property on a Custom Element ref, this is for template prop types only.
   */
  $emit: VueEmit<Events>;
};

type EventMap = {
  [event: string]: Event;
};

// This maps an EventMap to the format that Vue's $emit type expects.
type VueEmit<T extends EventMap> = EmitFn<{
  [K in keyof T]: (event: T[K]) => void;
}>;
