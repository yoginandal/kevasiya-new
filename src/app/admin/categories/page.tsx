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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const API_URL = "http://localhost:3001/api";

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
}

interface SubCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  categoryId: number;
}

interface DeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  name: string;
}

// Reusable component for Delete confirmation
function DeleteDialog({
  open,
  onOpenChange,
  onConfirm,
  name,
}: DeleteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the{" "}
            <strong>{name}</strong> category and all its related sub-categories
            and products.
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

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  // State for the forms
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newSubCategoryName, setNewSubCategoryName] = useState("");

  // State for delete dialogs
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{
    type: "categories" | "subcategories";
    id: number;
    name: string;
  } | null>(null);

  const fetchCategories = async () => {
    const res = await fetch(`${API_URL}/categories`);
    setCategories(await res.json());
  };

  const fetchSubCategories = async (categoryId: number) => {
    const res = await fetch(
      `${API_URL}/subcategories?categoryId=${categoryId}`
    );
    setSubCategories(await res.json());
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchSubCategories(selectedCategory.id);
    } else {
      setSubCategories([]);
    }
  }, [selectedCategory]);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`${API_URL}/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newCategoryName,
        slug: newCategoryName.toLowerCase().replace(/ /g, "-"),
        description: "",
      }),
    });
    setNewCategoryName("");
    fetchCategories(); // Refresh list
  };

  const handleAddSubCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory) return;
    await fetch(`${API_URL}/subcategories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newSubCategoryName,
        slug: newSubCategoryName.toLowerCase().replace(/ /g, "-"),
        description: "",
        categoryId: selectedCategory.id,
      }),
    });
    setNewSubCategoryName("");
    fetchSubCategories(selectedCategory.id); // Refresh list
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;

    const { type, id } = itemToDelete;
    await fetch(`${API_URL}/${type}/${id}`, { method: "DELETE" });

    if (type === "categories") {
      fetchCategories();
      setSelectedCategory(null);
    } else if (selectedCategory) {
      fetchSubCategories(selectedCategory.id);
    }

    setIsDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  const openDeleteDialog = (
    type: "categories" | "subcategories",
    item: Category | SubCategory
  ) => {
    setItemToDelete({ type, id: item.id, name: item.name });
    setIsDeleteDialogOpen(true);
  };

  return (
    <>
      <DeleteDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDelete}
        name={itemToDelete?.name || ""}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Manage Categories</CardTitle>
            <CardDescription>
              Add or select a category to see its sub-categories.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddCategory} className="flex gap-2 mb-4">
              <Input
                placeholder="New category name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
              <Button type="submit">Add</Button>
            </form>
            <div className="flex flex-col gap-2">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className={`flex items-center justify-between p-2 rounded-lg ${
                    selectedCategory?.id === cat.id ? "bg-muted" : ""
                  }`}
                >
                  <Button
                    variant="ghost"
                    onClick={() => setSelectedCategory(cat)}
                    className="flex-grow justify-start"
                  >
                    {cat.name}
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => openDeleteDialog("categories", cat)}
                        className="text-red-600"
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Manage Sub-Categories</CardTitle>
            <CardDescription>
              {selectedCategory
                ? `Sub-categories for ${selectedCategory.name}`
                : "Select a category first"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedCategory && (
              <form onSubmit={handleAddSubCategory} className="flex gap-2 mb-4">
                <Input
                  placeholder="New sub-category name"
                  value={newSubCategoryName}
                  onChange={(e) => setNewSubCategoryName(e.target.value)}
                />
                <Button type="submit">Add</Button>
              </form>
            )}
            <div className="flex flex-col gap-2">
              {subCategories.map((sub) => (
                <div
                  key={sub.id}
                  className="flex items-center justify-between p-2 border rounded-lg"
                >
                  <span>{sub.name}</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => openDeleteDialog("subcategories", sub)}
                        className="text-red-600"
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
