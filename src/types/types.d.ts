type Click = React.MouseEvent<HTMLElement>;
type Change = React.ChangeEvent<HTMLInputElement>;
type Submit = React.FormEvent<HTMLFormElement>;

interface ICat {
  id?: number;
  name: string;
  phone: string;
  email: string;
  image: {
    url: string;
    alt: string;
  };
  favoured: boolean;
  color?: string;
  gender?: string;
  index: number;
}
