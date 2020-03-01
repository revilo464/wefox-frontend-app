export interface Post {
  id?: number,
  title: string,
  content: string,
  lat?: number,
  long?: number,
  image_url?: string,
  created_at?: Date,
  updated_at?: Date,
}

export interface PostJSON {
  id?: number,
  title: string,
  content: string,
  lat: string | null,
  long: string | null,
  image_url: string | null,
  created_at: string,
  updated_at: string,
}

export function decodePost(json: PostJSON): Post {
  return {
    id: json.id,
    title: json.title,
    content: json.content,
    lat: json.lat ? parseFloat(json.lat) : undefined,
    long: json.long ? parseFloat(json.long) : undefined,
    image_url: json.image_url ? json.image_url : undefined,
    created_at: new Date(json.created_at),
    updated_at: new Date(json.updated_at)
  }
}

export function encodePost(post: Post): PostJSON {
  return {
    id: post.id,
    title: post.title,
    content: post.content,
    lat: post.lat ? JSON.stringify(post.lat) : '',
    long: post.long ? JSON.stringify(post.long) : '',
    image_url: post.image_url ? post.image_url : '',
    created_at: JSON.stringify(post.created_at),
    updated_at: JSON.stringify(post.updated_at)
  }
}
