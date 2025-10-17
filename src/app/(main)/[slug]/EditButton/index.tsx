import Link from "next/link";

type EditButtonProps = {
  slug: string;
};

const EditButton = ({ slug }: EditButtonProps) => {
  return (
    <Link
      className="button-secondary"
      href={`/${slug}/edit`}
    >
      Edit
    </Link>
  );
};

export default EditButton;