type Props = {
  message: string;
};

export default function ErrorMessage({ message }: Props) {
  return (
    <span className="text-sm text-destructive" role="alert">
      {message}
    </span>
  );
}
