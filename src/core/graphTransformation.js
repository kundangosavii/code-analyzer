function transformGraph(graphJson){
    const nodes = []
    const edges = []
    const edgeSet = new Set()

    for(const file in graphJson){
        const result = file.split("\\")
        const label=result.pop()
        const type=result.pop()
        nodes.push(
            {
                data: {
                    id: file,
                    label : label,
                    type: type
                }
            }
        )

        const imports = graphJson[file].imports

        imports.forEach((imp) => {
            const edgeKey = `${file}->${imp}`

            if(!edgeSet.has(edgeKey)){
            edges.push({
                data:{
                    source: file,
                    target: imp
                }
            })

            edgeSet.add(edgeKey)
        }
        })
    }

    return { nodes, edges }
}

export {transformGraph}