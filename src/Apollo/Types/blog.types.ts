export interface BlogData {
    category: {
        name: string;
        slug: string;
    }
    createdAt: Date
    createdBy: {
        picture: string;
        name: string;
    }
    excerpt: string;
    ogImage: {
        url: string;
    }
    post: {
        html: string;
    }
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

export interface AggregateCount {
    count: number
}

export interface GetBlogData {
    blogsConnection: {
        edges: NodeData[];
        pageInfo: PageInfo;
        aggregate: AggregateCount;
    }
}
export interface SingleBlogData {
    category: {
        name: string;
        image: {
            url: string;
        };
        slug: string;
    };
    comments: CommentsData[];
    createdAt: Date;
    createdBy: {
        name: string;
        picture: string;
    };
    dislike: number;
    kewwords: string;
    like: number;
    ogImage: {
        url: string;
    };
    post: {
        html: string;
    };
    excerpt: string;
    seoTitle: string;
    seoDescription: string;
    title: string;
    view: number;
}

export interface GetSingleBlogData {
    blog: SingleBlogData
}

export interface AddCommentData {
    createComment: {
        name: string;
    }
}

export interface CommentsData {
    email: string;
    description: string;
    name: string;
    reply: string;
    createdAt: Date;
    updatedAt: Date;
    updatedBy: {
        name: string;
        picture: string;
    }
}

export interface GetCommentData {
    comments: CommentsData[];
}

export interface UpdateViewsData {
    updateBlog: {
        title: string;
    }
}