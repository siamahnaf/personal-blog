export interface BlogData {
    category: {
        name: string;
        image: {
            url: string;
        }
    }
    createdAt: Date
    createdBy: {
        picture: string;
        name: string;
    }
    dislike: number;
    excerpt: string;
    kewwords: string;
    like: number;
    ogImage: {
        url: string;
    }
    post: {
        html: string;
    }
    seoDescription: string;
    seoTitle: string;
    slug: string;
    title: string;
    view: number;
}
export interface NodeData {
    node: BlogData
}
export interface PageInfo {
    hasNextPage: boolean;
    endCursor: string;
    pageSize: number;
}

export interface GetBlogData {
    blogsConnection: {
        edges: NodeData[];
        pageInfo: PageInfo;
    }

}