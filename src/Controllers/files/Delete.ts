import { FastifyInstance, FastifyRequest } from "fastify";

import { File } from "../../Repositories/FileRepository";

interface IRequest {
	uid: string
}

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.delete("/delete", {
		schema: {
			tags: ["File"],
			body: {
				type: "object",
				properties: {
					uid: { type: "string" }
				}
			},
			response: {
				200: {
					type: "object",
					properties: {
						ok: { type: "boolean" },
						status: { type: "number" },
						data: { type: "boolean" }
					}
				}
			}
		}
	}, async (req: FastifyRequest) => {
		try {
			const { uid } = req.params as IRequest;
			return {
				ok: true,
				status: 200,
				data: await File.Delete(uid)
			};
		} catch (error) {
			throw new Error(error);
		}
	});
};