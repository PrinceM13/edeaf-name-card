export default function CardFrame({ children }: any) {
  return (
    <div className="p-4 mx-auto mt-20 w-[300px] rounded-xl bg-[#ebf6fc] shadow-gray-800 shadow-lg flex flex-col gap-4">
      {children}
    </div>
  );
}