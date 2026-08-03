variable "region" {
  type = string
}

variable "private_subnet_ids" {
  description = "Private subnet IDs for EKS"
  type        = list(string)
}

variable "eks_cluster_info" {
  type = object({
    name          = string
    version       = string
    node_count    = number
    instance_type = string
  })
}