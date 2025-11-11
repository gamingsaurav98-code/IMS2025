type Product = {
  _id?: string;
  name: string;
  price?: number;
  description?: string;
  image?: string;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="rounded-lg border bg-white p-4 shadow-sm">
      <div className="h-40 w-full overflow-hidden rounded-md bg-gray-100">
        {product.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>
      <h3 className="mt-3 text-lg font-semibold text-gray-800">
        {product.name}
      </h3>
      <p className="mt-1 text-sm text-gray-600">{product.description ?? "—"}</p>
      <div className="mt-3 flex items-center justify-between">
        <div className="text-sm font-medium text-indigo-600">
          ${product.price ?? 0}
        </div>
        <button className="rounded-md bg-indigo-600 px-3 py-1 text-sm font-semibold text-white hover:bg-indigo-700">
          Edit
        </button>
      </div>
    </article>
  );
}
