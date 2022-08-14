const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType } = require('graphql');

const project = require('../models/projects')
const client = require('../models/client')

//client Type
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        phone: {type: GraphQLString},
    })
})
// Project Type
const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        status: {type: GraphQLString},
        client: {
            type: ClientType,
            resolve(parent,arg){
                return client.findById(parent.clientId);
            },
        }
    })
})


const rootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        projects: {
            type: new GraphQLList(ClientType),
            resolve(parents, args){
                return project.find();
            }
        },
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args){
                return project.findById(args.id);
            }
        },
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parents, args){
                return client.find();
            }
        },
        client: {
            type: ClientType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args){
                return client.findById(args.id);
            }
        }
    }
})


//Mutations
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        //add a client details in db
        addClient: {
            type: ClientType,
            args: {
                name: {type: GraphQLNonNull(GraphQLString)},
                email: {type: GraphQLNonNull(GraphQLString)},
                phone: {type: GraphQLNonNull(GraphQLString)},
            },
            resolve(parent, args){
                const Client = new client({
                    name: args.name,
                    email: args.email,
                    phone: args.phone,
                });
                return Client.save();
            }
        },
        // delete a client details in db
        deleteClient: {
            type: ClientType,
            args: {
                id: {type: GraphQLNonNull(GraphQLID)},
            },
            resolve(parent, args){
                return client.findByIdAndRemove(args.id);
            }
        },
        // add a project
        addProject: {
            type: ProjectType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString)},
                description: { type: GraphQLNonNull(GraphQLString)},
                status: {
                    type: new GraphQLEnumType({
                        name: 'ProjectStatus',
                        values: {
                            'new': { value: 'Not Started'},
                            'progress': { value: 'In Progress' },
                            'completed': { values: 'Completed' },
                        },
                    }),
                    defaultValue: 'Not Started',
                },
                clientId: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(parent,args){
                const Project = new project({
                    name: args.name,
                    description: args.description,
                    status: args.status,
                    clientId: args.clientId,
                });
                return Project.save();
            }
        },
        // delete Project in db
        deleteProject: {
            type: ProjectType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID)},
            },
            resolve(parent,args){
                return project.findByIdAndRemove(args.id);
            }
        },
        // update a project in db
        // updateProject: {
        //     type: ProjectType,
        //     args: {
        //         id: { type: GraphQLNonNull(GraphQLID)},
        //         name: { type: GraphQLString},
        //         description: { type: GraphQLString},
        //         status: {
        //             type: new GraphQLEnumType({
        //                 name: 'ProjectStatusUpdate',
        //                 values: {
        //                     'new': { value: 'Not Started'},
        //                     'progress': { value: 'In Progress' },
        //                     'completed': { values: 'Completed' },
        //                 },
        //             }),
        //         },
        //         resolve(parent,args){
        //             return project.findByIdAndUpdate(args.id,{
        //                 $set: {
        //                     name: args.name,
        //                     description: args.description,
        //                     status: args.status
        //                 }
        //             },
        //             {new: true},
        //             );
        //         }
        //     },
        // },
    },
})




module.exports = new GraphQLSchema({
    query: rootQuery,
    mutation
})