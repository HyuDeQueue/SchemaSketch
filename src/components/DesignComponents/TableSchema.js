export class TableSchema {
    constructor(tableName = "Table", color = "pink", xPos = 0, yPos = 0) {
      this.tableName = tableName;
      this.columns = [];
      this.indices = [];
      this.color = color;   
      this.xPos = xPos;    
      this.yPos = yPos;  
    }

    addColumn(name, dataType) {
      this.columns.push({ name, dataType });
    }
  
    addIndex(indexName, columns) {
      this.indices.push({ indexName, columns });
    }

    updateTableName(name){
        this.tableName = name;
    }
  
    updatePosition(x, y) {
      this.xPos = x;
      this.yPos = y;
    }
  
    changeColor(newColor) {
      this.color = newColor;
    }
  }