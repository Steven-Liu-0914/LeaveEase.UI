FROM node:21
WORKDIR /app
RUN npm install -g @angular/cli
COPY package.json package-lock.json ./
RUN npm install @popperjs/core --legacy-peer-deps
RUN npm install @ng-bootstrap/ng-bootstrap @popperjs/core --legacy-peer-deps
RUN npm install --legacy-peer-deps
COPY . .
EXPOSE 4200
CMD ["ng", "serve", "--host", "0.0.0.0"]