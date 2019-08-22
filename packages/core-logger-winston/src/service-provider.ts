import { Services, Support, Types } from "@arkecosystem/core-kernel";
import { defaults } from "./defaults";
import { WinstonLogger } from "./driver";

export class ServiceProvider extends Support.AbstractServiceProvider {
    public async register(): Promise<void> {
        const logManager: Services.Log.LogManager = this.app.resolve<Services.Log.LogManager>("logManager");
        logManager.extend("winston", async () => new WinstonLogger(this.opts).make());
        logManager.setDefaultDriver("winston");

        // Note: Ensure that we rebind the logger that is bound to the container so IoC can do it's job.
        this.app.bind("log", await logManager.driver());
    }

    public manifest(): Types.PackageJson {
        return require("../package.json");
    }

    public configDefaults(): Types.ConfigObject {
        return defaults;
    }

    public provides(): string[] {
        return ["log"];
    }

    public async required(): Promise<boolean> {
        return true;
    }
}
