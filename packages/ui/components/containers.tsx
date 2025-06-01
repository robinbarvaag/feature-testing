import { HTMLAttributes, ReactNode } from "react";
interface BaseWrapperProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

interface ContainerProps extends BaseWrapperProps {
  maxWidth?: string;
  padding?: string;
  margin?: string;
}

export const Container = ({
  children,
  className = "",
  maxWidth = "max-w-7xl",
  padding = "px-4 sm:px-6 lg:px-8",
  margin = "mx-auto",
  ...props
}: ContainerProps) => {
  return (
    <div className={`${maxWidth} ${padding} ${margin} ${className}`} {...props}>
      {children}
    </div>
  );
};

export const NarrowContainer = ({
  children,
  className = "",
  ...props
}: BaseWrapperProps) => {
  return (
    <Container maxWidth="max-w-3xl" className={className} {...props}>
      {children}
    </Container>
  );
};

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  className?: string;
  bgColor?: string;
  spacing?: string;
}

export const Section = ({
  children,
  className = "",
  bgColor = "bg-white",
  spacing = "py-12 md:py-16",
  ...props
}: SectionProps) => {
  return (
    <section className={`${bgColor} ${spacing} ${className}`} {...props}>
      <Container>{children}</Container>
    </section>
  );
};

interface CardProps extends BaseWrapperProps {
  padding?: string;
}

export const Card = ({
  children,
  className = "",
  padding = "p-6",
  ...props
}: CardProps) => {
  return (
    <div
      className={`bg-white rounded-lg shadow ${padding} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

interface FullWidthContainerProps extends BaseWrapperProps {
  padding?: string;
}

export const FullWidthContainer = ({
  children,
  className = "",
  padding = "px-4 sm:px-6 lg:px-8 py-12 md:py-20",
  ...props
}: FullWidthContainerProps) => {
  return (
    <div className={`w-full ${padding} ${className}`} {...props}>
      {children}
    </div>
  );
};
