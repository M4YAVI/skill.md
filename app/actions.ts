"use server";

import { db } from "./db";
import { manifestoItems } from "./db/schema";
import { desc, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getManifestoItems() {
    try {
        const items = await db.select().from(manifestoItems).orderBy(desc(manifestoItems.createdAt));
        return items;
    } catch (error) {
        console.error("Failed to fetch items:", error);
        return [];
    }
}

export async function createManifestoItem(label: string, category: string, skill: string = "") {
    try {
        await db.insert(manifestoItems).values({
            label,
            category,
            skill,
        });
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Failed to create item:", error);
        return { success: false, error: "Failed to create item" };
    }
}

export async function incrementViewCount(id: number) {
    try {
        await db
            .update(manifestoItems)
            .set({ views: sql`${manifestoItems.views} + 1` })
            .where(eq(manifestoItems.id, id));
        revalidatePath("/"); // Optional: depends on if we want real-time updates for views
    } catch (error) {
        console.error("Failed to increment view count:", error);
    }
}

export async function incrementCopyCount(id: number) {
    try {
        await db
            .update(manifestoItems)
            .set({ copies: sql`${manifestoItems.copies} + 1` })
            .where(eq(manifestoItems.id, id));
        revalidatePath("/");
    } catch (error) {
        console.error("Failed to increment copy count:", error);
    }
}

export async function deleteManifestoItem(id: number) {
    try {
        await db.delete(manifestoItems).where(eq(manifestoItems.id, id));
        revalidatePath("/");
        revalidatePath("/admin");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete item:", error);
        return { success: false, error: "Failed to delete item" };
    }
}

export async function updateManifestoItem(id: number, data: { label?: string; category?: string; skill?: string }) {
    try {
        console.log("Updating item:", id, data);
        await db
            .update(manifestoItems)
            .set({
                ...(data.label ? { label: data.label } : {}),
                ...(data.category ? { category: data.category } : {}),
                ...(data.skill ? { skill: data.skill } : {}),
            })
            .where(eq(manifestoItems.id, id));

        revalidatePath("/");
        revalidatePath("/admin");
        return { success: true };
    } catch (error) {
        console.error("Failed to update item:", error);
        return { success: false, error: "Failed to update item" };
    }
}
