export interface EventQuery {
  category?: string
  price?: {
    $eq?: number
    $lte?: number
    $gt?: number
  }
  startDate?: {
    $gte?: string
    $lte?: string
  }
  endDate?: {
    $gte?: string
    $lte?: string
  }
  coordenates?: {
    $geoWithin?: {
      $centerSphere: [number, number]
    }
  }
}
