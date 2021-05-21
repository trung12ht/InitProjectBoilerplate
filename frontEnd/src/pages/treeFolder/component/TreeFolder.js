import { TreeView } from '@material-ui/lab';
import FolderTree from 'react-folder-tree';
import "../styles/tree.folder.scss"
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import Label from '@material-ui/icons/Label';
import getLastPath from '../../listProject/untils/until';



const useStyles = makeStyles({
    root: {
        height: 240,
        flexGrow: 1,
        maxWidth: 400
    }
});

const TreeFolder = ({ id, tree, getFile, name }) => {

    const classes = useStyles();

    const treeState = {
        name: name,
        isOpen: true,
        children: tree
    };

    let idTree = 0;

    const handleClick = (s, fileName) => {
        var url = s.replace(treeState.name + "/", '');
        if (url.split("/").pop().includes('.')) {
            getFile(id, url, fileName)
        }
    }

    const renderTree = (nodes, name) => (
        <TreeItem key={idTree++} nodeId={name + "/" + nodes.name} label={nodes.name} onClick={() => { handleClick(name + "/" + nodes.name, nodes.name) }}>
            {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node, name + "/" + nodes.name)) : null}
        </TreeItem>
    );

    return (
        <div className='demo-sandbox'>
            <TreeView
                className={classes.root}
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
            >
                {renderTree(treeState, treeState.name)}
            </TreeView>
        </div>
    );
};

export default TreeFolder;