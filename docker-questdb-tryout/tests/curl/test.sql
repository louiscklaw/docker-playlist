CREATE TABLE takeaway_order (ts TIMESTAMP, id SYMBOL, status SYMBOL)
  TIMESTAMP(ts);

INSERT INTO takeaway_order VALUES (now(), 'order1', 'placed');
INSERT INTO takeaway_order VALUES (now(), 'order2', 'placed');
