import { Support, Types } from "@arkecosystem/core-kernel";
import raygun from "raygun";
import { defaults } from "./defaults";

export class ServiceProvider extends Support.AbstractServiceProvider {
    public async register(): Promise<void> {
        this.app.bind("errorTracker", new raygun.Client().init((this.opts as unknown) as raygun.raygun.RaygunOptions));
    }

    public manifest(): Types.PackageJson {
        return require("../package.json");
    }

    public configDefaults(): Types.ConfigObject {
        return defaults;
    }

    public provides(): string[] {
        return ["errorTracker"];
    }
}
