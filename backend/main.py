import os
from fastapi import FastAPI, Body
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
import networkx as nx

load_dotenv()

app = FastAPI()

FRONTEND_URL = os.getenv("FRONTEND_URL")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: dict = Body(...)):

    nodes = pipeline.get('nodes', [])
    edges = pipeline.get('edges', [])

    G = nx.DiGraph()

    for node in nodes:
        G.add_node(node.get('id'))

    for edge in edges:
        G.add_edge(edge.get('source'),edge.get('target'))
    is_dag = nx.is_directed_acyclic_graph(G)

    print(is_dag)
    return {
        "num_nodes":len(nodes),
        "num_edges":len(edges),
        "is_dag": is_dag
    }
