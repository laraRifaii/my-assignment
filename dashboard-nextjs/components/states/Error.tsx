export default function Error({ message }: { message: string | null }) {
  return <p className="text-red-500 font-bold text-lg pt-4">{message}</p>;
}