  <img src="https://github.com/Roupstrer02/University-Student-Marketplace/blob/main/static/favicon.svg" alt="lOGO" width="100">

# TMU Marketplace

Welcome to TMU Marketplace, the premier platform designed to enhance your professional life through a dynamic classifieds environment. Whether you're looking to buy, sell, or connect, TMU Marketplace is accessible anytime, anywhere, tailored specifically for your job life.

## Youtube Demo Video:

https://www.youtube.com/watch?v=l3FvRfsYiOs

## Prerequisites

Before you start, ensure you have the following:

- A [Supabase Project](https://supabase.com/) set up for authentication, database management, and real-time messaging.
- Supabse project schema,

  <img src="https://github.com/allgeo/TMU-Marketplace/assets/62227321/0d573f43-2648-4a08-ab0a-923762d50e9d" alt="Supabase Scheme" width="800">

- A `.env` file with the following credentials:
  ```bash
  PUBLIC_SUPABASE_URL=
  PUBLIC_SUPABASE_ANON_KEY=
  PUBLIC_STRIPE_KEY=
  ```

## Local Development Setup

To set up TMU Marketplace for local development, follow these steps:

#### Clone the Repository

  ```bash
git clone https://github.com/allgeo/TMU-Marketplace.git
  ```
#### Install Dependencies

```bash
npm install
  ```
#### Run the Application
```bash
npm run dev -- --open
 ```

#### Build the Application (optional, for production builds)
  ```
npm run build
  ```

## Deployment 

TMU Marketplace can be deployed using Vercel or Netlify. To deploy your app, an adapter for your target environment may be required.


#### Vercel and Netlify Deployment Steps 
1. **Automated Deployments:** Start by connecting your GitHub account to Vercel or Netlify and import your TMU Marketplace Git repository. This step enables automatic deployments.
2. **Configure Deployment Settings:** Define your project settings, including the root directory and build commands. This is crucial for a successful deployment.
3. **Environment Variables:** Ensure to configure the .env variables on your chosen deployment platform.
4. **Automatic Updates:** With CI/CD pipeline support, any push to the main branch triggers an automatic deployment, updating your live site seamlessly.
