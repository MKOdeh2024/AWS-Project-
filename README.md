# Deploying Book Management App to AWS
## 1. Packaging the App

First, let's package our app to upload it as an asset in a GitHub release:

    - Navigate to your app's root directory.
    - Run the following commands:

bash

$ npm install
$ npm run build
$ tar czvf app.tar.gz package.json package-lock.json dist/*

    - Upload the app.tar.gz to your public GitHub repo as a release asset.

## 2. Setting Up AWS
### 2.1 Create an EC2 Instance

    Go to the EC2 dashboard and launch a new instance.
    Choose an Amazon Linux 2 AMI which already comes with systemd.
    Complete the instance creation process as usual. Remember to allow HTTP and HTTPS traffic in your security group.

### 2.2 Install Node.js on EC2

SSH into your instance and run:

bash

$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
$ . ~/.nvm/nvm.sh
$ nvm install node

### 2.3 Set up systemd

    Create a file /etc/systemd/system/bookmanagement.service with the following content:

ini

[Unit]
Description=Book Management App

[Service]
ExecStart=/usr/bin/node /path_to_your_app/dist/index.js
Restart=always
User=ec2-user
Group=nogroup
Environment=PATH=/usr/bin:/usr/local/bin
Environment=NODE_ENV=production
WorkingDirectory=/path_to_your_app

[Install]
WantedBy=multi-user.target

Replace /path_to_your_app/ with the path to where you've placed your app on the EC2 instance.

    Reload systemd and enable the service:

bash

$ sudo systemctl daemon-reload
$ sudo systemctl enable bookmanagement
$ sudo systemctl start bookmanagement

### 2.4 Setting up Auto-Scaling Group and Application Load Balancer

    In the EC2 Dashboard, go to Load Balancers and create an Application Load Balancer.
    Set up listeners for HTTP and HTTPS.
    Create a target group with your EC2 instance.
    Now, go to Auto-Scaling Groups and create a new group using your instance as the base.
    Set the desired capacity to 1 for now, but it can be changed later as per traffic requirements.
    Attach the Application Load Balancer to this Auto-Scaling Group.
    For the bonus requirement, go to the "Scaling Policies" tab of the Auto-Scaling Group, click "Add policy", and set the target to 60% for the Average CPU Utilization.

(![Screenshot from 2023-08-19 19-22-40](https://github.com/MKOdeh2024/AWS-Project-/assets/137823341/36495f31-eab1-4c4a-b3d2-c257486c8137)) 

## 3. Test the Deployment

    After everything is set up, access the application by using the DNS name of your Load Balancer.

    Test the EC2 instance IP address endpoint to ensure the load is distributed among instances when you scale up.

README Screenshots

Throughout the process, ensure you're taking screenshots for each of the steps mentioned above. These can be added to the README using the following Markdown format:

markdown

![Description of Image](URL_TO_IMAGE)

Bonus: Publishing as a Medium Article

For a Medium article:

    Log in to your Medium account.
    Click on "Write a story".
    Paste the entire guide, and enhance it with your personal insights, difficulties you faced, solutions, and more.
    Add screenshots in between the steps.
    Once done, click "Publish" and choose relevant tags like AWS, Express.js, Deployment, etc.
    Share the link on your social profiles or in communities to get more visibility.
