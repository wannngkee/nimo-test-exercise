import usePagination from "@mui/material/usePagination";
import { styled } from "@mui/material/styles";
import style from "./CustomPagination.module.css";
import { getPopoverUtilityClass } from "@mui/material";

const List = styled("ul")({
  listStyle: "none",
  margin: "30px",
  display: "flex",
  justifyContent: "center",
});

const CustomPagination = (props) => {
  const { currentPage, onChange, changePage } = props;
  const { items } = usePagination({
    count: 135,
    page: currentPage,
  });

  return (
    <nav>
      <List>
        {items.map(({ page, type, selected, ...item }, index) => {
          let children = null;

          if (type === "start-ellipsis" || type === "end-ellipsis") {
            children = (
              <button type="button" {...item} className={style.btn}>
                ...
              </button>
            );
          } else if (type === "previous") {
            children = (
              <button
                type="button"
                {...item}
                className={`${style.btn} ${style.pre}`}
                onClick={() => changePage(-1)}
              >
                {" "}
                &lt;&nbsp;Prev
              </button>
            );
          } else if (type === "next") {
            children = (
              <button
                type="button"
                {...item}
                className={`${style.btn} ${style.next}`}
                onClick={() => changePage(+1)}
              >
                {" "}
                Next&nbsp;&gt;
              </button>
            );
          } else {
            children = (
              <button
                type="button"
                className={
                  selected ? `${style.btn} ${style.selected}` : `${style.btn}`
                }
                {...item}
                onClick={() => onChange(page)}
              >
                {page}
              </button>
            );
          }

          return <li key={index}>{children}</li>;
        })}
      </List>
    </nav>
  );
};

export default CustomPagination;
