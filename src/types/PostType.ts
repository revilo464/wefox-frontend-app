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
  id: number,
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
