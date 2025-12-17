resource "aws_key_pair" "my_key_pair" {
  key_name   = "ssh-key"
  public_key = file("ssh-key.pub")
  tags = {
    description = "Key pair for EC2 instances" 
  }
  
}
resource "aws_security_group" "my_security_group" {
  name        = "automate-sg"
  description = "Security group using Terraform"
  vpc_id      = aws_default_vpc.default_vpc.id
  
  # Inbound rules
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
}
   egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = [ "0.0.0.0/0" ]
    description = "outside access"
  }
}
resource "aws_default_vpc" "default_vpc" {
  # This resource creates a default VPC if one does not already exist
  
}
resource "aws_instance" "my_instance" {
  count = 1
  instance_type = "t3.micro"
  ami="ami-02b8269d5e85954ef"
key_name = aws_key_pair.my_key_pair.key_name
  security_groups = [aws_security_group.my_security_group.name]

  
  tags = {
    Name = "MyEC2Instance"
    Environment = "Development"
  }
  
  depends_on = [
    aws_key_pair.my_key_pair,
    aws_security_group.my_security_group
  ]
}
