import express from 'express';
import { initializeDatabase } from "./database";

class AppBootstrap {
  private app: express.Application;
  private readonly port: number | string;

  constructor(app: express.Application, port: number | string) {
    this.app = app;
    this.port = port;
  }

  public async initialize(): Promise<void> {
    try {
      await initializeDatabase();
      this.startServer();
    } catch (error) {
      console.error('Failed to initialize services:', error);
      process.exit(1);
    }
  }

  private startServer(): void {
    this.app.listen(this.port, () => {
      console.log(`Server is running on http://localhost:${this.port}`);
    });
  }
}

export default AppBootstrap;
