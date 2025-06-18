"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const API_URL = "http://localhost:3001/api";

interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  subcategory_id: number;
  included_items?: string[];
  images?: string[];
  image?: string;
}

interface Category {
  id: number;
  name: string;
}

interface SubCategory {
  id: number;
  name: string;
  categoryId: number;
}

interface ProductDialogProps {
  product?: Product & { category_id?: number };
  onSave: () => void;
  trigger: React.ReactNode;
}

interface DeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

function ProductDialog({ product, onSave, trigger }: ProductDialogProps) {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(
    product ? String(product.category_id) : ""
  );

  // Form state
  const [name, setName] = useState(product ? product.name : "");
  const [description, setDescription] = useState(
    product ? product.description : ""
  );
  const [price, setPrice] = useState(product ? product.price : "");
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<string>(
    product ? String(product.subcategory_id) : ""
  );
  const [includedItems, setIncludedItems] = useState("");
  const [images, setImages] = useState("");

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setSelectedSubCategoryId(String(product.subcategory_id));

      // Safely parse and set included_items
      let items = product.included_items || [];
      if (typeof items === "string") {
        try {
          items = JSON.parse(items);
        } catch (e) {
          console.error("Failed to parse included_items", e);
          items = [];
        }
      }
      setIncludedItems(Array.isArray(items) ? items.join("\n") : "");

      // Safely parse and set images
      let imgs = product.images || [];
      if (typeof imgs === "string") {
        try {
          imgs = JSON.parse(imgs);
        } catch (e) {
          console.error("Failed to parse images", e);
          imgs = [];
        }
      }
      setImages(Array.isArray(imgs) ? imgs.join("\n") : "");
    }
  }, [product]);

  useEffect(() => {
    if (open) {
      fetch(`${API_URL}/categories`)
        .then((res) => res.json())
        .then(setCategories);
    }
  }, [open]);

  useEffect(() => {
    if (selectedCategoryId) {
      fetch(`${API_URL}/subcategories?categoryId=${selectedCategoryId}`)
        .then((res) => res.json())
        .then(setSubCategories);
    } else {
      setSubCategories([]);
    }
  }, [selectedCategoryId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const imagesArray = images.split("\n").filter((item) => item.trim() !== "");
    const productData = {
      name,
      description,
      price,
      subcategory_id: parseInt(selectedSubCategoryId),
      slug: name.toLowerCase().replace(/ /g, "-").replace(/[?']/g, ""),
      included_items: includedItems
        .split("\n")
        .filter((item) => item.trim() !== ""),
      images: imagesArray,
      image: imagesArray[0] || "/images/placeholder.webp", // Use first image as main image
      packaging: "Standard Packaging",
    };

    const url = product
      ? `${API_URL}/products/${product.id}`
      : `${API_URL}/products`;
    const method = product ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });

    onSave();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>
            {product ? "Edit Product" : "Add New Product"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Select
                onValueChange={setSelectedCategoryId}
                defaultValue={selectedCategoryId}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={String(cat.id)}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subcategory" className="text-right">
                Sub-Category
              </Label>
              <Select
                onValueChange={setSelectedSubCategoryId}
                disabled={!selectedCategoryId}
                defaultValue={selectedSubCategoryId}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a sub-category" />
                </SelectTrigger>
                <SelectContent>
                  {subCategories.map((sub) => (
                    <SelectItem key={sub.id} value={String(sub.id)}>
                      {sub.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="includedItems" className="text-right">
                Included Items
              </Label>
              <Textarea
                id="includedItems"
                value={includedItems}
                onChange={(e) => setIncludedItems(e.target.value)}
                className="col-span-3"
                placeholder="Enter one item per line..."
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="images" className="text-right">
                Image URLs
              </Label>
              <Textarea
                id="images"
                value={images}
                onChange={(e) => setImages(e.target.value)}
                className="col-span-3"
                placeholder="Enter one image URL per line. The first will be the main image."
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function DeleteProductDialog({
  open,
  onOpenChange,
  onConfirm,
}: DeleteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action will permanently delete the product.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const fetchProducts = async () => {
    const res = await fetch(`${API_URL}/products`);
    setProducts(await res.json());
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;
    await fetch(`${API_URL}/products/${productToDelete.id}`, {
      method: "DELETE",
    });
    setIsDeleteDialogOpen(false);
    setProductToDelete(null);
    fetchProducts();
  };

  const openDeleteDialog = (product: Product) => {
    setProductToDelete(product);
    setIsDeleteDialogOpen(true);
  };

  return (
    <>
      <DeleteProductDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
      />
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Manage Products</CardTitle>
            <CardDescription>
              View, add, edit, or delete products.
            </CardDescription>
          </div>
          <ProductDialog
            onSave={fetchProducts}
            trigger={<Button>Add Product</Button>}
          />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <ProductDialog
                          product={product}
                          onSave={fetchProducts}
                          trigger={
                            <DropdownMenuItem
                              onSelect={(e) => e.preventDefault()}
                            >
                              Edit
                            </DropdownMenuItem>
                          }
                        />
                        <DropdownMenuItem
                          onClick={() => openDeleteDialog(product)}
                          className="text-red-600"
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
