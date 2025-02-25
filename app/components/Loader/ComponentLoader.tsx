import { FunctionComponent, ReactElement } from "react";

type ComponentLoaderProps = {
  className?: string;
};

type FullPageLoaderProps = ComponentLoaderProps & {
  containerClassName?: string;
};

export const ComponentLoader: FunctionComponent<ComponentLoaderProps> = ({
  className,
}): ReactElement => {
  return (
    <div
      className={`w-16 h-16 border-4 border-primary border-t-transparent border-solid rounded-full animate-spin ${className}`}
    />
  );
};

export const FullPageLoader: FunctionComponent<FullPageLoaderProps> = ({
  className,
  containerClassName,
}): ReactElement => {
  return (
    <div
      className={`h-52 w-full grid place-items-center ${containerClassName}`}
    >
      <div
        className={`w-12 h-12 border-4 border-primary border-t-transparent border-solid rounded-full animate-spin ${className}`}
      />
    </div>
  );
};
