export interface EventQuery {
  category?: string
  price?: {
    $eq?: number
    $lte?: number
    $gt?: number
  }
  startDate?: {
    $gte?: Date
    $lte?: Date
  }
  endDate?: {
    $gte?: Date
    $lte?: Date
  }
  location?: {
    $geoWithin?: {
      $centerSphere: [number, number]
    }
  }
}
