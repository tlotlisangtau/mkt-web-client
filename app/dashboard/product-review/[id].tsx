import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image_urls: string[];
  // Add other necessary fields here
}

const ProductReview = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch(`http://127.0.0.1:8000/api/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <div>
        {product.image_urls?.map((url, index) => (
          <img key={index} src={url} alt={`Product image ${index}`} style={{ width: '200px' }} />
        ))}
      </div>
      <button onClick={() => router.push(`/edit/${id}`)}>Edit</button>
      <button onClick={() => router.push(`/delete/${id}`)}>Delete</button>
    </div>
  );
};

export default ProductReview;
