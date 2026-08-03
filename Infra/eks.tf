resource "aws_eks_cluster" "base" {

  name = var.eks_cluster_info.name

  role_arn = aws_iam_role.eks_cluster.arn

  version = var.eks_cluster_info.version

  vpc_config {

    subnet_ids = [
      aws_subnet.private1.id,
      aws_subnet.private2.id
    ]
  }

  depends_on = [
    aws_iam_role_policy_attachment.eks_cluster_policy
  ]

  tags = {
    Env = terraform.workspace
  }
}

resource "aws_eks_node_group" "default" {

  cluster_name = aws_eks_cluster.base.name

  node_group_name = "default"

  node_role_arn = aws_iam_role.eks_node.arn

  subnet_ids = [
    aws_subnet.private1.id,
    aws_subnet.private2.id
  ]

  scaling_config {

    desired_size = var.eks_cluster_info.node_count

    min_size = 1

    max_size = 3
  }

  instance_types = [
    var.eks_cluster_info.instance_type
  ]

  depends_on = [
    aws_eks_cluster.base
  ]

  tags = {
    Env = terraform.workspace
  }
}